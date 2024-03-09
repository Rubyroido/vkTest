import { set } from 'mongoose';
import './GroupItem.css'
import { useState } from 'react';

function GroupItem({ group }) {
  const [visibility, setvisibility] = useState('group-item__friends-list_inactive')
  const groupType = group.closed ? 'Закрытая' : 'Открытая';

  function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  const followers = getNoun(group.members_count, 'подписчик', 'подписчика', 'подписчиков');
  const friends = group.friends ? getNoun(group.friends.length, 'друг', 'друга', 'друзей') : null;

  function toggleFriends() {
    if (visibility === '') {
      setvisibility('group-item__friends-list_inactive')
    } else {
      setvisibility('')
    }
  }

  return (
    <div className="group-item">
      {
        group.avatar_color ? (
          <div className="group-item__avatar" style={{ backgroundColor: `${group.avatar_color}` }}></div>
        ) :
          <div className='group-item__no-avatar'></div>
      }
      <div className='group-item__info'>
        <h4 className='group-item__name'>{group.name}</h4>
        <p>{groupType}</p>
        <p>{group.members_count} {followers}</p>
        {
          group.friends ? (
            <>
              <p className='group-item__friends' onClick={toggleFriends}>{group.friends.length} {friends}</p>
              <div className={`group-item__friends-list ${visibility}`}>
                {
                  group.friends.map(friend => {
                    return (
                      <p>{friend.first_name} {friend.last_name}</p>
                    )
                  })
                }
              </div>
            </>
          ) :
            null
        }
      </div>
    </div >
  )
}

export default GroupItem;