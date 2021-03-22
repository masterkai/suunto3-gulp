$(function () {
  const featureTabState = {
    last: 0
  }

  $('#features').each(() => {
    const tabList = $(this).find('.flexContainer--feature'),
      tabAnchors = tabList.find('.feature'),
      watchesBox = $(this).find('.flexContainer--featureTop .watchBox'),
      watches = watchesBox.find('.watch')
    tabAnchors.each((currentTab, obj) => {
      $(obj).on('click', () => {
        watches.eq(featureTabState.last).css({display: 'none', opacity: 0})
        watches.eq(currentTab).css({display: 'block', opacity: 1})
        featureTabState.last = currentTab

        let $this = $(obj)

        if ($this.hasClass('active')) {
          return
        }

        tabAnchors.removeClass('active')
        $this.addClass('active')
      })
    })

    tabAnchors.eq(0).trigger('click')
  })
})