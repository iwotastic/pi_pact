const $ = q => document.querySelector(q)

const setStatus = (text, status) => {
  $("#status").textContent = text
  $("#status").className = "alert " + status
}

const setRefreshStatus = (text) => {
  $("#refresh-status").textContent = text
}

const setLoading = (status) => {
  $("#spinner").style.display = status ? "block" : "none"
}

$("#scan-based-on-cli").addEventListener("click", e => {
  fetch("/scan_with_cli_opts").then(r => r.text()).then(txt => {
    console.log(txt)
  })
})

setInterval(() => {
  setRefreshStatus("(Refreshing...)")
  fetch("/job_active").then(r => r.text()).then(txt => {
    if (txt === "none") {
      setLoading(false)
      setRefreshStatus("")
      setStatus("No jobs are running.", "")
    }else if (txt === "some") {
      setLoading(true)
      setRefreshStatus("")
      setStatus("A job is active. Please wait...", "warning")
    }else if (txt === "done") {
      setLoading(false)
      setRefreshStatus("")
      setStatus("Job finished.", "success")
    }
  })
}, 3000)