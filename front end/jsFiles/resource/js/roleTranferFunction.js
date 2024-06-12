const roleTranferListDefine = (roleList,cleckedList=null,unCleckedList=null) => {
     if (cleckedList!=null){
          cleckedList.innerHTML = "";
          roleList.data.forEach(role => {
               let liElement = document.createElement('li');
               liElement.classList = 'border border-secondary form-control border-success';
               liElement.value = role.id;
               liElement.innerHTML = role.name;
               cleckedList.appendChild(liElement);
          });
     }
     if (unCleckedList!=null){
          unCleckedList.innerHTML = "";
          roleList.data.forEach(role => {
               let liElement = document.createElement('li');
               liElement.value = role.id;
               liElement.innerHTML = role.name;
               unCleckedList.appendChild(liElement);
               liElement.classList = 'border border-secondary form-control border-success';
          });
     }
}