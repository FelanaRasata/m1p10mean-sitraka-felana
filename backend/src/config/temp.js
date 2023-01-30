import html_to_pdf from 'html-pdf-node'


function convertHtmlToPdf(html) {

    return new Promise((resolve, reject) => {

        let options = { format: 'A4' }

        let file = { content: '<h1>Welcome to html-pdf-node</h1>' }

        html_to_pdf
            .generatePdf(file, options)
            .then(pdfBuffer => {

                resolve(pdfBuffer)

            })
            .catch((error) => {

                reject(error)

            })

    })

}

