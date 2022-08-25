-- 3: Latest AIR quality index in a division

SELECT ws.location, pm25, date FROM weather_station_data_table wsData, 
weather_station_table ws, 
data_source_table ds
WHERE wsData.dsID = ds.dsID AND ws.wsDsID = ds.dsID AND ws.location = 'dhaka'
ORDER BY date DESC LIMIT 1