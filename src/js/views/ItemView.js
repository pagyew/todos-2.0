import _ from 'underscore'
import { View } from 'backbone'
import ItemTemplate from '../../templates/ItemTemplate.html'

export default class ItemView extends View {

  get tagName() { return 'li' }
  get className() { return 'item' }
  get template() { return _.template(ItemTemplate) }

  get events() {
    return {
      'focus .item__label': 'edit',
      'click .item__box': 'toggleDone',
      'click button.item__delete': 'clear',
      'blur .item__label': 'close',
      'keypress .item__label': 'updateOnEnter',
      'keydown .item__label': 'cancelOnEscape'
    }
  }

  initialize() {
    // console.log('ItemView Init!');

    this.listenTo(this.model, 'destroy', this.remove)
  }

  render() {
    // console.log('Item render start!');

    this.$el.html(this.template(this.model.toJSON()))
    this.$el.toggleClass('done', this.model.get('done'))
    this.$input = this.$('.item__label')

    // console.log(`End Item render
    // ------------------------------------------------------------------------------------`);

    return this
  }

  edit() {
    console.log('Edit!');

    this.$el.addClass('editing')
  }

  toggleDone() {
    console.log('Toggle!');

    this.model.toggle()
  }

  clear() {
    console.log('Clear!');

    this.model.destroy()
    document.querySelector('[tabindex="-1"]').focus()
  }

  save(text) {
    console.log('Save!');

    this.model.save({ title: text })
    document.querySelector('[tabindex="-1"]').focus()
  }

  close() {
    console.log('Close!');

    let text = this.$input.text().trim()

    if (text === this.model.get('title')) return

    if (text) {
      this.save(text)
    } else {
      this.clear()
    }

    this.$el.removeClass('editing')
  }

  updateOnEnter(e) {
    if (e.which === 13) {
      console.log('Enter');
      e.preventDefault()
      this.close()
    }
  }

  cancelOnEscape(e) {
    if (e.which === 27) {
      console.log('Escape');
      this.$input.text(this.model.get('title'))
      this.close()
    }
  }
}