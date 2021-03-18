$csv = import-csv .\Harmonica.csv -delimiter ";" -Header 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
$lineNumber = 0
$notes = foreach ($line in $csv) {
    foreach ($property  in $line.PsObject.Properties) {
        if ("" -ne $property.value) {
            [PSCustomObject]@{
                holeNumber = $property.name
                row        = $lineNumber
                value      = $property.value
                technique  = " "
            }
        }

    }
    $lineNumber++
}
$notes | out-file .\richter.json

get-content .\richter.json | ConvertFrom-Json
##$json =$csv | ConvertTo-Json -Compress
##$json = $json -replace "`"\d\d?`":`"`",?",""
##$json | out-file .\richter.json