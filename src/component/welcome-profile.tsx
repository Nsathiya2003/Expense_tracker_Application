import profile from '../assets/expense1.jpg';

export default function WelcomeProfileComponent(){
    return(
        <>
       <div className="flex items-center gap-4">
        <img 
            src={profile} 
            alt="profile" 
            className="w-20 h-20 rounded-full object-cover"
        />

    <div>
        <h1 className="text-2xl font-semibold text-white">
        Welcome Back, <span className="text-[#00C8DC]">Sathiya</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1 italic">
        Know your spend. Own your life.
        </p>
    </div>
    </div>

      
        </>
    )
}