import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,about,photoUrl,age,gender } = user;
  
  return user && (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    {photoUrl && <img
      src={photoUrl}
      alt="user photo"
      className="rounded-xl" />}
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <h3>{age} {gender}</h3>
    <p>{about}</p>
    <div className="card-actions flex justify-center m-2">
      <button className="btn btn-primary">Ignored</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>  
</div>
  )
}

export default UserCard