  // MEDIA QUERIES

  export const matchMediaMobile = window.matchMedia("(max-width: 600px)");

  export const mediaQuery = (callbackMobile, callbackDesktop) => {

      if (matchMediaMobile.matches) {
          callbackMobile();
      } else {
          callbackDesktop();
      }
  }


  let headerEl = document.querySelector("header");
  let inputEl = document.getElementById('pac-input');
  let resultsNameEl = document.querySelector('.results-name');
  
  resultsNameEl.addEventListener("click", _ => {
      headerEl.classList.remove("hidden")
  })


  mediaQuery(_ => {

      let headerEl = document.querySelector("header");
      let inputEl = document.getElementById('pac-input');

      inputEl.addEventListener("click", _ => {
          headerEl.classList.add("hidden")
      })
  }, _ => {

  })

  // if (matchMediaMobile.matches) {
  //     callbackMobile();
  // } else {
  //     callbackDesktop();
  // }

  matchMediaMobile.addListener(_ => {

      mediaQuery(_ => {

          let headerEl = document.querySelector("header");
          let inputEl = document.getElementById('pac-input');

          inputEl.addEventListener("click", _ => {
              headerEl.classList.add("hidden")
          })
      }, _ => {



      })




      // matchMediaMobile.addListener(_ => {

      //     let headerEl = document.querySelector("header");
      //     let inputEl = document.getElementById('pac-input');

      //     if (matchMediaMobile.matches) {
      //         // console.log(headerEl)
      //         inputEl.addEventListener("resize", _ => {
      //         console.log("miki0")

      //             headerEl.classList.add("hidden")
      //         })
      //     } else {
      //         // console.log("miki")
      //         // console.log(headerEl)
      //         inputEl.removeEventListener("resize", _ => {
      //         console.log("miki")

      //             headerEl.classList.add("hidden")
      //         })
      //         // console.log("miki2")
      //         window.addEventListener("resize", _ => {
      //         console.log("miki2")

      //             headerEl.classList.remove("hidden")
      //         })
      //     }
  })