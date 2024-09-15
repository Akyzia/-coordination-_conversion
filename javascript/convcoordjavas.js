// Função para simular a conversão de coordenadas de latitude e longitude para UTM em JavaScript
function convertCoordinates(latitude, longitude) {
    // Simulação da conversão UTM, substitua com uma implementação real
    var utmEasting = longitude * 1000;  // Exemplo fictício de leste UTM
    var utmNorthing = latitude * 1000;  // Exemplo fictício de norte UTM
    return { easting: utmEasting, northing: utmNorthing };
}

    // Definir os sistemas de referência
        const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

        // Função para determinar a zona UTM com base na longitude
        function getUTMZone(longitude) {
            return Math.floor((longitude + 180) / 6) + 1;
        }

        // Função para determinar o hemisfério baseado na latitude
        function getUTMHemisphere(latitude) {
            return latitude >= 0 ? 'Norte' : 'Sul';
        }

        // Função para converter coordenadas para UTM e exibir o resultado
        function convertCoordinatesToUTM() {
            var latitude = parseFloat(document.getElementById('latitude').value);
            var longitude = parseFloat(document.getElementById('longitude').value);
            
            var utmZone = getUTMZone(longitude);
            var utmHemisphere = getUTMHemisphere(latitude);
            const utmProj = `+proj=utm +zone=${utmZone} +ellps=WGS84 +datum=WGS84 +units=m +no_defs ${utmHemisphere === 'Norte' ? '+north' : '+south'}`;
            
            // Chamada à função de conversão de coordenadas usando proj4js
            var utmCoords = proj4(wgs84, utmProj, [longitude, latitude]);
            
            // Exibir o resultado na página
            var resultDiv = document.getElementById('utmConversionResult');
            resultDiv.innerHTML = `UTM E: ${utmCoords[0].toFixed(2)}, UTM N: ${utmCoords[1].toFixed(2)}, Zona UTM: ${utmZone}, Hemisfério: ${utmHemisphere}`;
        }

        // Função para converter coordenadas UTM para graus decimais e exibir o resultado
        function convertCoordinatesToDegrees() {
            var utmEasting = parseFloat(document.getElementById('utmEasting').value);
            var utmNorthing = parseFloat(document.getElementById('utmNorthing').value);
            
            // Pegue as coordenadas de longitude e latitude para determinar a zona e o hemisfério
            var longitude = parseFloat(document.getElementById('longitude').value);
            var latitude = parseFloat(document.getElementById('latitude').value);
            var utmZone = getUTMZone(longitude);
            var utmHemisphere = getUTMHemisphere(latitude);
            const utmProj = `+proj=utm +zone=${utmZone} +ellps=WGS84 +datum=WGS84 +units=m +no_defs ${utmHemisphere === 'Norte' ? '+north' : '+south'}`;

            // Chamada à função de conversão de coordenadas usando proj4js
            var decimalCoords = proj4(utmProj, wgs84, [utmEasting, utmNorthing]);
            
            // Exibir o resultado na página
            var resultDiv = document.getElementById('degreesConversionResult');
            resultDiv.innerHTML = `Latitude: ${decimalCoords[1].toFixed(6)}, Longitude: ${decimalCoords[0].toFixed(6)}`;
        }