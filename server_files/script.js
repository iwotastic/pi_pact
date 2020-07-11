const $ = q => document.querySelector(q)

$("#scan-based-on-cli").addEventListener("click", e => {
  fetch("/scan_with_cli_opts").then(r => r.text()).then(txt => {
    console.log(txt)
  })
})