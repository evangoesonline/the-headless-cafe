const spaceId = "e2smwc8xm8dd"
const environmentId = "master"
const accessToken = "D2DFHXC6-xbyn2umf25aZF350WmvEQaZEA7QbWASSlA"
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`
const sectionTag = document.querySelector('section.grid')

const grabData = function () {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const assets = data.includes.Asset
            return data.items.map(item => {
                let imageUrl = 'image1.jpg'
                const imageId = item.fields.image.sys.id

                const imageData = assets.find(asset => {
                    return asset.sys.id == imageId
                })
                if (imageData) {
                    imageUrl = imageData.fields.file.url
                }
                item.fields.image = imageUrl
                return item.fields
            })
        })
}

grabData().then(data => {
    sectionTag.innerHTML = ''
    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
			<div class="item">
<img src="${item.image}">
				<div class="title">
				<h2>${item.title}</h2>
					<p>$${item.price}</p>
				</div>
			<p>${item.description}</p>
			</div>
`
    })
}) 
