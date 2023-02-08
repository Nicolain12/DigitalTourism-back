window.onload = function () {
    console.log('working')
    const selectFlight = document.querySelector('.Vuelo-header-select')
    const selectHotel = document.querySelector('.Hotel-header-select')
    const selectPackage = document.querySelector('.Paquete-header-select')

    selectFlight.addEventListener('click', function () {
        window.location.href = "http://localhost:3000/products/createFlight";        
    });
    selectHotel.addEventListener('click', function () {
        
    });
    selectPackage.addEventListener('click', function () {
        
    });


};