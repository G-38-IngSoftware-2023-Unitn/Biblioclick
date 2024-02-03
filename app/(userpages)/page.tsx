export default function Home() {
  return (
    <main>
        <h3 className="font">HOME PAGE</h3>
        <p>Informazioni presenti sulla home page di una webapp bibliotecaria</p>
        <br/>
        
        <h4>Where to find us</h4>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173.01271613819802!2d11.149800500898289!3d46.06698416204378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4782769503229ff9%3A0xc214a9f3a4958ca6!2sDepartment%20of%20Information%20Engineering%20and%20Computer%20Science%2C%20University%20of%20Trento!5e0!3m2!1sen!2sit!4v1706575889058!5m2!1sen!2sit" 
        width="600" height="450" className="border-0" allowFullScreen loading="lazy" /*referrerpolicy="no-referrer-when-downgrade" (commented because it gives an error for some reason)*/></iframe>

    </main>
  )
}
