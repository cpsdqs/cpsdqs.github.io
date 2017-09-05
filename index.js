const divideTextIntoSpans = function divideTextIntoSpans (container) {
  const text = container.textContent
  container.innerHTML = ''
  const spans = []
  for (const character of text) {
    const span = document.createElement('span')
    span.classList.add('animated-character')
    span.textContent = character
    container.appendChild(span)
    spans.push(span)
  }
  return spans
}

const animations = new WeakMap()

const unnecessaryTextHoverEffect = function unnecessaryTextHoverEffect (anchor) {
  const characters = divideTextIntoSpans(anchor)

  anchor.addEventListener('mouseenter', e => {
    let timeOffset = 0
    let shouldAnimate = true

    for (const character of characters) {
      let previousAnimation = animations.get(character)
      if (previousAnimation && previousAnimation.playState !== 'finished') {
        shouldAnimate = false
        break
      }
    }

    if (shouldAnimate) {
      for (const character of characters) {
        timeOffset += 30
        let animation = character.animate([
          { transform: 'none' },
          { transform: 'translateY(-2px) scale(1.2)' },
          { transform: 'translateY(1px)' },
          { transform: 'none' }
        ], {
          duration: 500,
          delay: timeOffset
        })
        animations.set(character, animation)
      }
    }
  })
}

if ('animate' in window.HTMLElement.prototype) {
  const anchors = document.querySelectorAll('a')
  for (const anchor of anchors) unnecessaryTextHoverEffect(anchor)
}
