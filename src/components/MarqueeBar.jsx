export function MarqueeBar() {
  const items = (
    <span>
      <b>NOW PLAYING</b>
      <em>· nexus backend · </em>
      <b>★</b><em> rust + nodejs + firestore </em>
      <b>★</b><em> evm bindings </em>
      <b>★</b><em> distributed systems </em>
      <b>★</b><em> still bad at css </em>
      <b>★</b><em> still good at sql </em>
      <b>★ </b>
    </span>
  )
  return (
    <div className="marquee">
      <div className="marquee-track">{items}{items}{items}</div>
    </div>
  )
}
