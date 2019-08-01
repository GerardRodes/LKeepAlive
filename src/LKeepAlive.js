export default {
  name: 'LKeepAlive',
  data: () => ({
    cache: new Map()
  }),
  render (h) {
    if (!this.$scopedSlots.default) return

    const vnodes = this.$scopedSlots.default()

    const children = []

    for (const [index, vnode] of vnodes.entries()) {
      const componentOptions = vnode && vnode.componentOptions

      if (!componentOptions) return vnode

      const key = vnode.key == null
        ? index + componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key

      if (this.cache.has(key)) {
        vnode.componentInstance = this.cache.get(key).componentInstance
      } else {
        this.cache.set(key, vnode)
      }

      vnode.data.keepAlive = true
      children.push(vnode)
    }

    return children.length === 1
      ? children[0]
      : h('div', null, children)
  }
}
