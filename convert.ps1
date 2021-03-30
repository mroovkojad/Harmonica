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


##$json =$csv | ConvertTo-Json -Compress
##$json = $json -replace "`"\d\d?`":`"`",?",""
##$json | out-file .\richter.json

$harmonica = get-content .\richter.json | ConvertFrom-Json

$holeCount= $harmonica | select -expandProperty holeNumber | measure-object -maximum | select -expandProperty maximum
$rows = $harmonica | select -expandProperty row | measure-object -maximum | select -expandProperty maximum
$rows++
$array = New-Object 'object[,]' $rows,$holeCount
$k=0;
for ($i = 0 ; $i -lt $rows; $i ++){
    for ($j = 0; $j -lt $holeCount; $j++) {
        $entry = $harmonica[$k]
        if (($entry.row -eq $i)-and (($entry.holeNumber-1) -eq $j))
        {
             $array[$i,$j] = $entry
             $k++
        }
    }
}

$harmonica = @{
    $tuning = "Richter"
    $notes = $array
}
$harmonica | ConvertTo-Json | out-file .\richter2.json