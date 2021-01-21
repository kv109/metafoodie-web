  // MEDIA QUERIES

  export const matchMediaMobile = window.matchMedia("(max-width: 690px)");
  export const matchMediaTablet = window.matchMedia("()");
  export const matchMediaDesktop = window.matchMedia("(min-width: 1020px)");
  export let mediaQueryChange = false;

  const headerEl = document.querySelector("header");
  const inputEl = document.getElementById('pac-input');
  const hideHeader = _ => headerEl.classList.add("hidden");

  const func1 = _ => {
    if (matchMediaMobile.matches) { 
        inputEl.addEventListener("click", hideHeader);
            } 
    
    }
  const func2 = _ => {inputEl.removeEventListener("click", hideHeader);}
  const func3 = _ => {headerEl.classList.remove("hidden")}
  
const func4 = _ => {
    if (matchMediaDesktop.matches) { 
        func2()
        func3()
           }
}

  const inputVisibilityMobile = _ => {
func1()
  }

  const inputVisibilityDesktop = _ => {
func4()
  }


  inputVisibilityMobile()
  matchMediaMobile.addListener(inputVisibilityMobile)

  inputVisibilityDesktop()
  matchMediaDesktop.addListener(inputVisibilityDesktop)