class YouTubeModal {
  constructor(videoId, playerId, playBtn) {
    this.videoId = videoId
    this.playerId = playerId
    this.playBtn = document.getElementById(playBtn) ? document.getElementById(playBtn) : null
    this.player = undefined
    this.onPlayerReady = this.onPlayerReady.bind(this)
    this.mountYouTubeApi()
    this.controller()
  }


  mountYouTubeApi() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api"

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  createModalBody() {
    return `
        <div class="Empy-modal-header Empy-modal-header--noContentOnlyCloseBtn"><button class="btn btn-empy-link closeBtn"></button></div>
        <div class="Empy-modal-body">
            <div id="${this.playerId}"></div>            
        </div>`
  }

  controller() {
    // Create Empy-mask & Empy-modal
    const mask = document.createElement('div')
    mask.className = "Empy-mask"
    // mask.setAttribute('data-reveal', null)
    const modal = document.createElement('div')
    modal.className = "Empy-modal"
    mask.appendChild(modal)

    this.playBtn && this.playBtn.addEventListener('click', () => {
      modal.textContent = ''
      modal.className = "Empy-modal Empy-modal--youtube"
      modal.insertAdjacentHTML('afterbegin', this.createModalBody())
      document.body.insertAdjacentElement('afterbegin', mask)
      const closeBtn = document.querySelector('.closeBtn')
      closeBtn.addEventListener('click', () => {
        mask.classList.remove('show')
        this.pauseVideo();
      })
      mask.classList.add('show')
      this.onYouTubeIframeAPIReady()

    })
  }

  onYouTubeIframeAPIReady() {
    this.player = new YT.Player(this.playerId, {
      height: '315',
      width: '560',
      videoId: this.videoId,
      playerVars: {rel: 0, showinfo: 0, ecver: 2},
      events: {
        'onStateChange': this.onPlayerStateChange,
        'onReady': this.onPlayerReady,
      }
    });
  }

  onPlayerReady() {
    console.log('video player is ready');
    this.activateVideo();
  }

  onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      console.log('player is playing');
    } else {
      console.log('player is not playing');
    }
  }

  stopVideo() {
    this.player.stopVideo();
  }

  activateVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    console.log('pause the video player and close the video modal.');
    this.player.pauseVideo();
  }

}