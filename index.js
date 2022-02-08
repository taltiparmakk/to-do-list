$(document).ready(function () { // sayfa açıldığında çalışacak
    if (localStorage.getItem("ullist")){ // liste localstorage belleğinde varsa oku
        document.getElementById("list").innerHTML = localStorage.getItem("ullist");
    }else{
        document.getElementById("list").innerHTML = '';
    }

    document.getElementById('task').focus(); // sayfa açıldığında imleci inputa at
    
    var el = document.getElementById("task"); // imlec inputtayken enter'a basılırsa çalıştır
    el.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            newElement();
        }
    });
})

function clearStorage(){
    localStorage.clear(); // localstorage belleğini temizle
    window.location.reload(); // sayfayı yenile
}

function newElement(){
    let value = document.getElementById("task").value.trim() // girilen değeri boşlukları atarak alır
    if(!value || value == ''){ // boş değer girilmişse çalışır
        $('.error').toast("show")
    }else[ // girilen değer doluysa
        document.getElementById("list").innerHTML += '<li onclick="markIt(this)">' + value + '<span onclick="deleteElement(this.parentNode)" class="close">x</span></li>', // li elementi olarak ekle
        document.getElementById("task").value = '', // inputu boşalt
        $('.success').toast("show"), // başarı mesajını göster
        localStorage.setItem("ullist", document.getElementById("list").innerHTML) // listeyi localstorage belleğine al
    ]
}

function deleteElement(id){
    document.getElementById("list").removeChild(id); // seçilen maddeyi kaldır
    document.getElementById("task").value = ''; // inputu boşalt
    $('.deleted').toast("show"); // silinme mesajını göster
    localStorage.setItem("ullist", document.getElementById("list").innerHTML); // listeyi localstorage belleğine al
}

function markIt(id){
    id.classList.toggle('checked'); // seçilen madde işaretliyse işareti kaldır, değilse işaretle
    localStorage.setItem("ullist", document.getElementById("list").innerHTML); // listeyi localstorage belleğine al
    $('.done').toast("show"); // tamamlandı mesajını göster
}