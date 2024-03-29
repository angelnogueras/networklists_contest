( ()=>{

  let interIP
  let interGEO
  let started = false

  const REQ_FREQ = 10 // Time in seconds between update requests
  const divIP = document.getElementById('content_ip')
  const divGEO = document.getElementById('content_geo')
  const btnStart = document.getElementById('btn_start')
  const btnStop = document.getElementById('btn_stop')
  const chiquito = document.getElementById('chiquito')
  const chronoElem = document.getElementById('chrono')
  const resIP = document.getElementById('resultsIP')
  const resGEO = document.getElementById('resultsGEO')
  const aud_mi = document.getElementById('aud_mi')

  btnStart.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (started) {
      console.log('Already running')
      return
    }
    started = true
    chronoStart()
    audioStart()
    getNetworkListIp()
    getNetworkListGeo()
    interIP = setInterval( ()=> {
      getNetworkListIp()
    }, REQ_FREQ * 1000 )
    interGEO = setInterval( ()=> {
      getNetworkListGeo()
    }, REQ_FREQ * 1000 )
    btnStart.disabled = true
    btnStop.disabled = false
    chiquito.style.visibility = 'visible'
    resIP.innerHTML = ''
    resGEO.innerHTML = ''
  })

  btnStop.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (!started) {
      console.log('Already stopped')
      return
    }
    stopIt()
  })

  const stopIt = () => {
    started = false
    clearInterval(interIP)
    clearInterval(interGEO)
    chronoStop()
    audioStop()
    btnStart.disabled = false
    btnStop.disabled = true
    chiquito.style.visibility = 'hidden'
  }

  const getNetworkListIp = () => {
    fetch('/nl_ip').then(res=>res.json())
      .then(elems => {
        console.log(elems)
        divIP.innerHTML = elems
        if (elems.length > 0) {
          clearInterval(interIP)
          resIP.innerHTML = `IP Network List updated in ${chronoElem.innerHTML}`
          interIP = null
          if (!interGEO) {
            stopIt()
          }
        }
      })
      .catch(error => console.error(error))
  }
  const getNetworkListGeo = () => {
    fetch('/nl_geo').then(res=>res.json())
      .then(elems => {
        console.log(elems)
        divGEO.innerHTML = elems
        if (elems.length > 0) {
          clearInterval(interGEO)
          resGEO.innerHTML = `GEO Network List updated in ${chronoElem.innerHTML}`
          interGEO = null
          if (!interIP) {
            stopIt()
          }
        }
      })
      .catch(error => console.error(error))
  }

  // Chronometer

  let startTime = 0
  let start = 0
  let end = 0
  let diff = 0
  let timerID = 0

  const chrono = () => {
  	end = new Date()
  	diff = end - start
  	diff = new Date(diff)
  	let msec = diff.getMilliseconds()
  	let sec = diff.getSeconds()
  	let min = diff.getMinutes()
  	let hr = diff.getHours()-1
  	if (min < 10){
  		min = "0" + min
  	}
  	if (sec < 10){
  		sec = "0" + sec
  	}
  	if(msec < 10){
  		msec = "00" +msec
  	}
  	else if(msec < 100){
  		msec = "0" +msec
  	}
  	chronoElem.innerHTML = hr + ":" + min + ":" + sec + ":" + msec
  	timerID = setTimeout(chrono, 10)
  }

  const chronoStart = () => {
  	start = new Date()
  	chrono()
  }

  const chronoContinue = () => {
  	start = new Date()-diff
  	start = new Date(start)
  	chrono()
  }

  const chronoReset = () => {
  	chronoElem.innerHTML = "0:00:00:000"
  	start = new Date()
  }

  const chronoStopReset = () => {
  	chronoElem.innerHTML = "0:00:00:000"
  }

  const chronoStop = () => {
  	clearTimeout(timerID)
  }

  const audioStart = () => {
    aud_mi.play()
  }
  const audioStop = () => {
    aud_mi.pause()
  }
//-->

})()
