const shellExec = require('shell-exec')
const csv = require('csvtojson')

const csvFilePath = './urls.csv'

csv({ noheader: true })
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        console.log(jsonObj)
        jsonObj.forEach((url) => {
            shellExec(
                `aws s3api put-object --bucket nativerootsdispensary.com --key ${url.field1} --website-redirect-location ${url.field2}`
            )
                .then(() =>
                    console.log(
                        `${url.field1} succesffully redirected to ${url.field2}`
                    )
                )
                .catch(
                    () => `Failed to redirect ${url.field1} to ${url.field2}`
                )
        })
    })
