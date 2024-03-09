import './Groups.css';
import GroupItem from "../GroupItem/GroupItem";

function Groups(props) {
  return (
    <ul className="groups__list">
      {
        props.groups.map((group) => {
          return (
            <li className="groups__list-item" key={group.id}>
              <GroupItem group={group}></GroupItem>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Groups;