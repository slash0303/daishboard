const dirAlias = {
  imports: {
    "/src/": "/src/",                          // root
    "/src/components/": "/src/components/",     // components
    "/src/res/": "/src/res/",                   // static resources
    "/src/utils/": "/src/utils/"            // utility scripts
  }
};

const script = document.createElement('script');        // create empty script tag
script.type = 'importmap';                              // set script type as 'importmap' (same as <script type="importmap">)
script.textContent = JSON.stringify(dirAlias);          // stringify and append aliases
document.currentScript.after(script);                   // add script tag in DOM.