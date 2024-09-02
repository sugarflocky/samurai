/* import express, {Request, Response} from "express";

const AvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

export const videos: VideoType[] = [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-08-28T19:08:28.731Z",
        "publicationDate": "2024-08-28T19:08:28.731Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        "id": 1,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-08-28T19:08:28.731Z",
        "publicationDate": "2024-08-28T19:08:28.731Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        "id": 2,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-08-28T19:08:28.731Z",
        "publicationDate": "2024-08-28T19:08:28.731Z",
        "availableResolutions": [
            "P144"
        ]
    }
]

type VideoType = {
    id?: number
    title: string
    author: string
    canBeDownloaded?: boolean
    minAgeRestriction?: number | null
    createdAt?: string
    publicationDate?: string
    availableResolutions?: typeof AvailableResolutions

}

type CreateVideoType = {
    title: string
    author: string
    availableResolutions?: typeof AvailableResolutions
}

type UpdateVideoType = {
    title: string
    author: string
    availableResolutions?: typeof AvailableResolutions
    canBeDownloaded?: boolean
    minAgeRestriction?: number
    publicationDate?: string
}



 app.get('/videos', (req: Request, res: Response) => {
    res.send(videos);
})

app.get('/videos/:id', (req: RequestWithParams<Param>, res: Response) => {
    const id = +req.params.id

    const video = videos.find(v => v.id === id)

    if (!video){
        res.sendStatus(404)
        return
    }

    res.send(video);
})

app.post('/videos', (req: RequestWithBody<CreateVideoType>, res: Response) => {
    const errors: ErrorType = {
        errorMessages: []
    }

    let {title, author, availableResolutions} = req.body
    if (!title || !title.trim() || title.trim().length > 40){
        errors.errorMessages.push({message: 'Incorrect title!', field: 'title'})
    }
    if (!author || !author.trim() || author.trim().length > 20){
        errors.errorMessages.push({message: 'Incorrect author!', field: 'author'})
    }
    if (Array.isArray(availableResolutions)){
        availableResolutions.forEach(resolution => {
            if (!AvailableResolutions.includes(resolution)){
                errors.errorMessages.push({message: 'Incorrect available resolution!', field: 'availableResolutions'})
                return
            }
        })
    } else {
        availableResolutions = []
    }
    if (errors.errorMessages.length){
        res.status(400).send(errors)
        return
    }

    const createdAt = new Date()
    const publicationDate = new Date()

    publicationDate.setDate(createdAt.getDate() + 1)

    const newVideo: VideoType = {
        id: +new Date(),
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        title,
        author,
        availableResolutions
    }

    videos.push(newVideo)
    res.status(201).send(newVideo)

})

app.put('/videos/:id', (req: RequestWithParamsAndBody<Param,UpdateVideoType>, res: Response) => {
    const id = +req.params.id;
    const Index = videos.findIndex(v => v.id === id)
    let video = videos.find(v => v.id === id)
    if (!video){
        res.sendStatus(404)
        return
    }

    const errors: ErrorType = {
        errorMessages: []
    }

    let {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = req.body

    if (!title || !title.trim() || title.length > 40){
        errors.errorMessages.push({message: 'Incorrect title!', field: 'title'})
    }

    if (!author || !author.trim() || author.trim().length > 20){
        errors.errorMessages.push({message: 'Incorrect author!', field: 'author'})
    }
    if (Array.isArray(availableResolutions)){
        availableResolutions.forEach(resolution => {
            if (!AvailableResolutions.includes(resolution)){
                errors.errorMessages.push({message: 'Incorrect available resolution!', field: 'availableResolutions'})
                return
            }
        })
    } else {
        availableResolutions = []
    }
    if (minAgeRestriction) {
        if (!(minAgeRestriction >= 1 || minAgeRestriction <= 18))
        {
            errors.errorMessages.push({message: 'Incorrect minAge restriction!', field: 'minAgeRestriction'})
        }
    }
    videos[Index] = {
        ...video,
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate
    }
    res.sendStatus(204)
})

app.delete('/videos/:id', (req: RequestWithParams<Param>, res: Response) => {
    const id = +req.params.id
    const index = videos.findIndex(v => v.id === id)
    if(index < 0) {
        res.sendStatus(404)
        return
    }
    videos.splice(index, 1)
    res.sendStatus(204)
})


*/