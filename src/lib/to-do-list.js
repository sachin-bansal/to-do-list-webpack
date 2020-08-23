import styles from '../css/to-do-list.scss';

const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
<style>${styles.toString()}</style>
<ul id="todos"></ul>
`;

class TodoList extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(itemTemplate.content.cloneNode(true));

        this.$todoList = this._shadowRoot.querySelector('ul');
        this._todos = [];
    }

    _removeTodo(e) {
        this._todos.splice(e.detail, 1);
        this._renderTodoList();
    }

    _toggleTodo(e) {
        const todo = this._todos[e.detail];
        this._todos[e.detail] = Object.assign({}, todo, {
            checked: !todo.checked
        });
        this._renderTodoList();
    }

    addTodo(toDo) {
        if(toDo){
            this._todos.push({ text: toDo, checked: false });
            this._renderTodoList();
        }
    }

    _renderTodoList() {
        this.$todoList.innerHTML = '';

        this._todos.forEach((todo, index) => {
            let $todoItem = document.createElement('to-do-item');
            $todoItem.setAttribute('text', todo.text);

            if(todo.checked) {
                $todoItem.setAttribute('checked', '');
            }

            $todoItem.setAttribute('index', index);

            $todoItem.addEventListener('onRemove', this._removeTodo.bind(this));
            $todoItem.addEventListener('onToggle', this._toggleTodo.bind(this));

            this.$todoList.appendChild($todoItem);
        });
    }
}

export default TodoList;

// window.customElements.define('to-do-list', TodoList);