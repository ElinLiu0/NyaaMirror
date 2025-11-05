from fastapi import FastAPI
import httpx
from fastapi.responses import (
    JSONResponse,
    Response
)
import bs4
import uuid
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# async def fetchCateImage(cateImageLink: str) -> str:
#     async with httpx.AsyncClient() as client:
#         response = await client.get(cateImageLink)
#         imageData = base64.b64encode(response.content).decode('utf-8')
#         return f"data:image/png;base64,{imageData}"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def fetchMovies(q:str) -> JSONResponse:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://nyaa.si/?q={q}&f=0&c=0_0")
        responseHTML = response.text
        data = []
        soup = bs4.BeautifulSoup(responseHTML, 'html.parser')
        table = soup.find("table",{"class": "table table-bordered table-hover table-striped torrent-list"})
        if table != None:
            table = table.find_all("tr")[1:]
        else:
            return JSONResponse(content=data)
        for row in table:
            cateString = row.find_all("td")[0].find("a").get("title")
            cateImage = "https://nyaa.si" + row.find_all("td")[0].find("img").get("src")
            name = row.find_all("td")[1].find_all("a")
            if len(name) == 2:
                name = name[1].text
            else:
                name = name[0].text
            torrentLink = "https://nyaa.si" + row.find_all("td")[2].find_all("a")[0].get("href")
            magnetLink = row.find_all("td")[2].find_all("a")[1].get("href")
            size = row.find_all("td")[3].text
            date = row.find_all("td")[4].text
            seeders = int(row.find_all("td")[5].text)
            leechers = int(row.find_all("td")[6].text)
            downloads = int(row.find_all("td")[7].text)

            data.append({
                "key": str(uuid.uuid4()),
                "cateString": cateString,
                "cateImage": cateImage,
                "name": name,
                "torrentLink": torrentLink,
                "magnetLink": magnetLink,
                "size": size,
                "date": date,
                "seeders": seeders,
                "leechers": leechers,
                "downloads": downloads
            })
        # cateImageFetchTasks = [fetchCateImage(item["cateImage"]) for item in data]
        # cateImages = await asyncio.gather(*cateImageFetchTasks)
        # for i in range(len(data)):
        #     data[i]["cateImage"] = cateImages[i]
        return JSONResponse(content=data)

@app.get("/download")
async def downloadTorrent(torrent_id: str) -> Response:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://nyaa.si/download/{torrent_id}.torrent")
        return Response(
            content=response.content,
            media_type="application/x-bittorrent",
            headers={
                "Content-Disposition": f"attachment; filename={torrent_id}.torrent"
            }
        )

@app.get("/getCateImage")
async def getCateImage(cateImageLink: str) -> Response:
    async with httpx.AsyncClient() as client:
        response = await client.get(cateImageLink)
        imageData = response.content
        return Response(
            content=imageData,
            media_type="image/png"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
