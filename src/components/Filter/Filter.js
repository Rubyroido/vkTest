import './Filter.css';

function Filter({ onReset, onPrivicyFilter, onColorFilter, onFriendsFilter }) {
  return (
    <form className="filter">
      <label>
        Приватность:
        <select defaultValue='any' name='privacy' onChange={(e)=> onPrivicyFilter(e.target.value)}>
          <option value='any'>Все</option>
          <option value={false}>Открытая</option>
          <option value={true}>Закрытая</option>
        </select>
      </label>
      <label>
        Цвет аватарки:
        <select defaultValue='any' name='avatar' onChange={(e)=> onColorFilter(e.target.value)}>
          <option value='any'>Любой</option>
          <option value='red'>Красный</option>
          <option value='green'>Зеленый</option>
          <option value='yellow'>Желтый</option>
          <option value='blue'>Синий</option>
          <option value='purple'>Фиолетовый</option>
          <option value='white'>Белый</option>
          <option value='orange'>Оранжевый</option>
        </select>
      </label>
      <label>
        Друзья:
        <select defaultValue='any' name='friends' onChange={(e)=> onFriendsFilter(e.target.value)}>
          <option value='any'>Не важно</option>
          <option value={true}>Есть</option>
          <option value={false}>Нет</option>
        </select>
      </label>
      <input type='reset' value='Сбросить фильтр' onClick={onReset}></input>
    </form>
  )
}

export default Filter;