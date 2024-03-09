import './App.css';
import Filter from './components/Filter/Filter';
import Groups from './components/Groups/Groups';
import GroupsMock from './mock/groups.json';
import { useEffect, useState } from 'react';

function App() {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [privacyFilter, setPrivacyFilter] = useState('any');
  const [colorFilter, setColorFilter] = useState('any');
  const [friendsFilter, setFriendsFilter] = useState('any');

  const server = {
    GetGroupsResponse() {
      return new Promise((resolve) => {
        setTimeout(
          () =>
            resolve({
              groups: GroupsMock,
            }),
          1000
        )
      })
    }
  }

  useEffect(() => {
    server.GetGroupsResponse()
      .then((res) => {
        setGroups(res.groups);
        setFilteredGroups(res.groups)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    filter();
  }, [privacyFilter, colorFilter, friendsFilter])

  function filter() {
    const foundGroups = groups.filter((group) => {
      if (privacyFilter !== 'any' && group.closed !== (privacyFilter === 'true')) {
        return false;
      }
      if (colorFilter !== 'any' && group.avatar_color !== colorFilter) {
        return false;
      }
      if (friendsFilter !== 'any') {
        if (friendsFilter === 'true' && !group.friends) {
          return false;
        }
        if (friendsFilter === 'false' && group.friends) {
          return false;
        }
      }
      return true;
    });

    setFilteredGroups(foundGroups);
  }

  function resetFilter() {
    setFilteredGroups(groups)
  }

  return (
    <div className="App">
      <Filter
        onReset={resetFilter}
        onPrivicyFilter={setPrivacyFilter}
        onColorFilter={setColorFilter}
        onFriendsFilter={setFriendsFilter}></Filter>
      <Groups groups={filteredGroups}></Groups>
    </div>
  );
}

export default App;
