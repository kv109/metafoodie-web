    // MEDIA QUERY INPUT.FOCUS() AND HIDE HEADER ON MOBILE

    mediaQuery(_ => {
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
        if (matchMediaMobile.matches) {
            inputEl.addEventListener("click", _ => {
                headerEl.classList.add("hidden")
            })
        } else {
            console.log("miki")

            inputEl.removeEventListener("click", _ => {
                headerEl.classList.add("hidden")
            })
            console.log("miki2")
            window.addEventListener("resize", _ => {
                headerEl.classList.remove("hidden")
            })
        }
    })

    //     matchMediaMobile.addListener(_ => {
    //         mediaQuery(_ => {
    //             inputEl.addEventListener("click", _ => {
    //                 headerEl.classList.add("hidden")
    //             })
    //         }, _ => {
    // console.log("miki")
    //             inputEl.removeEventListener("click", _ => {
    //                 headerEl.classList.add("hidden")
    //             })
    //             console.log("miki2")


    //             window.addEventListener("resize", _ => {
    //                 headerEl.classList.remove("hidden")
    //             })
    //         })
    //     })

    // END OF MEDIA QUERY INPUT.FOCUS() AND HIDE HEADER ON MOBILE