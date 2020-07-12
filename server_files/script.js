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

const setJobsEnabled = (status) => {
  $("#scan-based-on-cli").disabled = !status
}

$("#scan-based-on-cli").addEventListener("click", e => {
  fetch("/scan_with_cli_opts").then(r => r.text()).then(txt => {
    console.log(txt)
  })
})

$("#download-scans").addEventListener("click", e => {
  fetch("/list_scans").then(r => r.json()).then(scans => {
    $("#scan-selector").textContent = ""
    scans.forEach(scan => {
      let option = document.createElement("option")
      option.textContent = scan
      option.value = scan
      $("#scan-selector").appendChild(option)
    })

    $("#download-scans-dialog").classList.remove("hidden")
  })
})

$("#download-scan").addEventListener("click", e => {
  $("#download-scans-dialog").classList.add("hidden")
  open("/download_scan?scan=" + encodeURIComponent($("#scan-selector").value))
})

setInterval(() => {
  setRefreshStatus("(Refreshing...)")
  fetch("/job_active").then(r => r.text()).then(txt => {
    if (txt === "none") {
      setJobsEnabled(true)
      setLoading(false)
      setRefreshStatus("")
      setStatus("No jobs are running.", "")
    }else if (txt === "some") {
      setJobsEnabled(false)
      setLoading(true)
      setRefreshStatus("")
      setStatus("A job is active. Please wait...", "warning")
    }else if (txt === "done") {
      setJobsEnabled(true)
      setLoading(false)
      setRefreshStatus("")
      setStatus("Job finished.", "success")
    }
  }).catch(reason => {
    setJobsEnabled(false)
    setLoading(false)
    setRefreshStatus("(Can't connect...)")
    setStatus("Status unknown. Connection to Pi unavailable.", "danger")
  })
}, 3000)