( ()=>{

  let interIP
  let interGEO
  let started = false

  const divIP = document.getElementById('content_ip')
  const divGEO = document.getElementById('content_geo')
  const btnStart = document.getElementById('btn_start')
  const btnStop = document.getElementById('btn_stop')
  const chiquito = document.getElementById('chiquito')

  btnStart.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (started) {
      console.log('Already running')
      return
    }
    started = true
    interIP = setInterval( ()=> {
      getNetworkListIp()
    }, 10 * 1000 )
    interGEO = setInterval( ()=> {
      getNetworkListGeo()
    }, 10 * 1000 )
    btnStart.disabled = true
    btnStop.disabled = false
    chiquito.style.visibility = 'visible'
  })

  btnStop.addEventListener('click', (evt) => {
    evt.preventDefault()
    if (!started) {
      console.log('Already stopped')
      return
    }
    started = false
    clearInterval(interIP)
    clearInterval(interGEO)
    btnStart.disabled = false
    btnStop.disabled = true
    chiquito.style.visibility = 'hidden'
  })

  const getNetworkListIp = () => {
    fetch('/nl_ip').then(res=>res.json())
      .then(elems => {
        console.log(elems)
        divIP.innerHTML = elems
        if (elems.length > 0) {
          clearInterval(interIP)
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
        }
      })
      .catch(error => console.error(error))
  }


})()
