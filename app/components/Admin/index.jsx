import styles from './Admin.module.scss'

export default function AdminCom() {
  return (
   <div className={styles.back}>
    <p className='title'>Brands Registration</p>
    <table>
      <thead>
        <tr>
          <th>Заголовок 1</th>
          <th>Заголовок 2</th>
          <th>Заголовок 3</th>
          <th>Заголовок 4</th>
        </tr>
      </thead>
      <tbody>
        {info.map((data, index) => (
          <tr key={index}>
            <td>{data.col1}</td>
            <td>{data.col2}</td>
            <td>{data.col3}</td>
            <td>{data.col4}</td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
  )
}
