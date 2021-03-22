class Carousel {
  constructor(carousel, imgContainer, leftBtn, rightBtn, images, timeout) {
    this.carousel = carousel
    this.imgContainer = imgContainer
    this.leftBtn = leftBtn
    this.rightBtn = rightBtn
    this.images = images
    this.timeout = timeout
    this.sliderSize = this.carousel.clientWidth
    this.index = 0
    this.resizeTimer = null
    this.pagination = this.carousel.querySelector('.pagination')
    this.interval = this.timeout ? setInterval(() => this.run(), this.timeout) : false
    this.resetSize()
    this.windowResize()
    this.controller()
    this.createCircle()
    this.addActiveCircle(this.index)
  }

  currentIndex() {
    // console.log(this.index);
    return this.index
  }

  slideTo(index) {
    this.index = index
    this.changeImage()
    this.addActiveCircle(index)
  }

  controller() {
    const that = this
    this.rightBtn.addEventListener('click', () => {
      that.index++
      this.changeImage()
      this.addActiveCircle(this.index)
      this.resetInterval()
      this.currentIndex()
    })
    this.leftBtn.addEventListener('click', () => {
      that.index--
      this.changeImage()
      this.addActiveCircle(this.index)
      this.resetInterval()
      this.currentIndex()
    })

  }

  windowResize() {
    const that = this
    window.addEventListener('resize', function (event) {
      if (that.resizeTimer) clearTimeout(that.resizeTimer);
      that.resizeTimer = setTimeout(() => {
        that.resetSize()
      }, 500)
    })
  }

  resetSize() {
    this.index = 0
    this.changeImage()
    this.sliderSize = this.carousel.clientWidth
    if (window.innerWidth <= 500) {
      this.images.forEach(image => image.style.width = '100%')
    } else {
      this.images.forEach(image => image.style.width = `${this.carousel.clientWidth}`)
    }
  }

  createCircle() {
    for (let i = 0; i < this.images.length; i++) {
      const div = document.createElement('div')
      div.classList.add('circle')
      this.pagination.insertAdjacentElement('afterbegin', div)
    }
  }

  addActiveCircle(index) {
    const circles = this.pagination.querySelectorAll('.circle')
    circles.forEach(item => item.classList.remove('active'))
    circles[index].classList.add('active')
  }

  run() {
    this.index++
    this.changeImage()
    this.addActiveCircle(this.index)
  }

  resetInterval() {
    if (this.timeout) {
      console.log('interval has been reset!!');
      clearInterval(this.interval)
      this.interval = setInterval(() => this.run(), this.timeout)
    }

  }

  changeImage() {
    if (this.index > this.images.length - 1) {
      this.index = 0
    } else if (this.index < 0) {
      this.index = this.images.length - 1
    }
    this.imgContainer.style.transform = `translateX(${-this.index * this.sliderSize}px)`
  }
}