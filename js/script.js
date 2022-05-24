const btn = document.querySelector('#btn')
btn.addEventListener('click', flipCoin)


async function flipCoin () {
  let resultEl = document.querySelector('#result')
  let flipResult = await fetch('http://localhost:8000/api/flip-coin')
    .then(res => res.json())
    .then(data => data.flipResult)

  resultEl.innerText = flipResult
}