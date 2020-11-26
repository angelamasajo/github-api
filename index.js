'use strict';


//fetch users
function getUserRepos(userSubmit) {
    fetch (`https://api.github.com/users/${userSubmit}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

//submit form
function watchForm () {
    $('#js-form').submit(event => {
        console.log('submitting...');
        event.preventDefault();
        let userSubmit = $('#js-search-user').val();
        getUserRepos(userSubmit);
        $('#js-search-user').val('');
    });
}


//display results to the DOM
// function displayResults(responseJson) {
//     console.log(responseJson);
//     $('#repos').removeClass('hidden');
//     $('#repos-list').empty();
//     for (let i = 0; i < responseJson.value.length; i++) {
//         $('#repos-list').append(
//             `<li><h3><a href="${responseJson.value[i].html_url}">${responseJson.value[i].name}</a></h3>
//             <p>link: ${responseJson.value[i].html_url}</p>
//             </li>`  
//         )
//     }
// }

function displayResults(responseJson) {
    console.log(responseJson);
    $("#repos-list").empty();
    let responseHtml = "";
    responseJson.forEach(userRepo => {
      responseHtml += `<h3 class="panel-title">${userRepo.name}</h3>
       <a href=" ${userRepo.html_url}">Repo URL Link</a>`;
    });
    $("#search-results").html(responseHtml);
    $("#repos").removeClass("hidden");
  }





//calling the function
$(function () {
    console.log('App loaded! Waiting for submit!');
    watchForm();
});