// import React from 'react';
// import Navbar from '../../components/userside/Navbar';
// import Footer from '../../components/userside/Footer';

// const Home = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-grow">
//         {/* Hero Section */}
//         <section className="bg-black py-20">
//   <div className="container mx-auto px-6">
//     <div className="flex flex-col md:flex-row items-center">
//       <div className="md:w-1/2 mb-8 md:mb-0">
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-50 mb-4">Welcome to EduWave</h1>
//         <p className="text-xl text-gray-50 mb-8">Empowering learners worldwide with cutting-edge online education.</p>
//         <a href="/courses" className="bg-[#B0FC35] text-2xl text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9AE02D] transition duration-300">
//           Explore Courses
//         </a>
//       </div>
//       <div className="md:w-1/2">
//         <img
//           src="\banner.jpg?height=400&width=600"
//           alt="EduWave Learning"
//           className="rounded-lg shadow-md w-full h-auto md:w-[90%] md:h-[90%]"
//         />
//       </div>
//     </div>
//   </div>
// </section>


//         {/* Features Section */}
//         <section className="bg-black py-20 border-b border-gray-500">
//           <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center text-gray-50 mb-8">Our Features</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div className="bg-[#B0FC35] rounded-lg shadow-md p-6">
//                 <h3 className="text-2xl font-semibold mb-4 text-gray-50">Online Courses</h3>
//                 <p className="text-1xl text-gray-600">Explore our wide range of online courses taught by expert instructors.</p>
//               </div>
//               <div className="bg-[#B0FC35] rounded-lg shadow-md p-6">
//                 <h3 className="text-2xl font-semibold mb-4 text-gray-50">Live Tutoring</h3>
//                 <p className="text-1xl text-gray-600">Get personalized help from our experienced tutors in real-time.</p>
//               </div>
//               <div className="bg-[#B0FC35] rounded-lg shadow-md p-6">
//                 <h3 className="text-2xl font-semibold mb-4 text-gray-50">Interactive Learning</h3>
//                 <p className=" text-1xl text-gray-600">Engage with our interactive learning materials and quizzes.</p>
//               </div>
//             </div>
//           </div>
//         </section>

// {/* Image Section */}
// <section className="bg-black py-20  border-gray-50">
//   <div className="container mx-auto px-6">
//     <div className="flex flex-col md:flex-row items-center">
//       <div className="md:w-1/2 mb-8 md:mb-0">
//         <img
//           src="\banner2.jpg?height=400&width=600"
//           alt="Learning Environment"
//           className="rounded-lg shadow-md w-full h-auto"
//         />
//       </div>
//       <div className="md:w-1/2 md:pl-10">
//         <h2 className="text-4xl font-bold text-gray-50 mb-4">Immersive Learning Experience</h2>
//         <p className="text-xl text-gray-50 mb-6">Our platform provides a rich, interactive environment that makes learning engaging and effective.</p>
//         <ul className="list-disc list-inside text-2xl text-gray-50">
//           <li>High-quality video lessons</li>
//           <li>Interactive quizzes and assignments</li>
//           <li>Real-time collaboration tools</li>
//           <li>Progress tracking and analytics</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </section>


//         {/* Testimonial Section */}
//         <section className="bg-black py-20">
//           <div className="container mx-auto px-6">
//             <h2 className="text-4xl font-bold text-center text-gray-50 mb-8">What Our Students Say</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <p className="text-gray-600 mb-4">"EduWave has transformed my learning experience. The courses are engaging and the tutors are extremely helpful."</p>
//                 <p className="font-semibold text-[#B0FC35]">- Sarah Johnson</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <p className="text-gray-600 mb-4">"I've learned so much in such a short time. The interactive quizzes really help reinforce the material."</p>
//                 <p className="font-semibold text-[#B0FC35]">- Michael Chen</p>
//               </div>
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <p className="text-gray-600 mb-4">"The flexibility of EduWave allows me to balance my studies with my full-time job. It's been a game-changer!"</p>
//                 <p className="font-semibold text-[#B0FC35]">- Emily Rodriguez</p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import Navbar from '../../components/userside/Navbar';
import Footer from '../../components/userside/Footer';
import { ArrowRight, Book, Users, Globe } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  Empower Your Future with <span className="text-[#B0FC35]">EduWave</span>
                </h1>
                <p className="text-xl mb-8 text-gray-300">
                  Unlock your potential with cutting-edge online education. Learn, grow, and succeed with EduWave.
                </p>
                <a href="/courses" className="bg-[#B0FC35] text-black text-xl px-8 py-4 rounded-full font-semibold hover:bg-[#9AE02D] transition duration-300 inline-flex items-center">
                  Explore Courses
                  <ArrowRight className="ml-2" />
                </a>
              </div>
              <div className="md:w-1/2 relative">
                <img
                  src="/banner.jpg?height=400&width=600"
                  alt="EduWave Learning"
                  className="rounded-lg shadow-2xl w-full h-auto md:w-[90%] md:h-[90%] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[#B0FC35] opacity-5 transform -skew-y-6"></div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Why Choose <span className="text-[#B0FC35]">EduWave</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: Book, title: "Expert-Led Courses", description: "Learn from industry professionals and renowned academics." },
                { icon: Users, title: "Interactive Community", description: "Engage with peers and instructors in our vibrant learning community." },
                { icon: Globe, title: "Global Accessibility", description: "Access your courses anytime, anywhere in the world." }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-8 text-center transition-transform duration-300 hover:scale-105">
                  <feature.icon className="w-16 h-16 mx-auto mb-6 text-[#B0FC35]" />
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 relative">
                <img
                  src="/banner2.jpg?height=400&width=600"
                  alt="Learning Environment"
                  className="rounded-lg shadow-2xl w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-4xl font-bold mb-6">Immersive Learning Experience</h2>
                <p className="text-xl text-gray-300 mb-8">Our platform provides a rich, interactive environment that makes learning engaging and effective.</p>
                <ul className="space-y-4">
                  {["High-quality video lessons", "Interactive quizzes and assignments", "Real-time collaboration tools", "Progress tracking and analytics"].map((item, index) => (
                    <li key={index} className="flex items-center text-lg">
                      <span className="bg-[#B0FC35] rounded-full p-1 mr-3">
                        <svg className="w-4 h-4 text-black" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sarah Johnson", text: "EduWave has transformed my learning experience. The courses are engaging and the tutors are extremely helpful." },
                { name: "Michael Chen", text: "I've learned so much in such a short time. The interactive quizzes really help reinforce the material." },
                { name: "Emily Rodriguez", text: "The flexibility of EduWave allows me to balance my studies with my full-time job. It's been a game-changer!" }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-8 shadow-lg transition-transform duration-300 hover:scale-105">
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-[#B0FC35]">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#B0FC35] text-black">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students already learning on EduWave. Unlock your potential today!</p>
            <a href="/signup" className="bg-black text-[#B0FC35] text-xl px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition duration-300 inline-flex items-center">
              Get Started Now
              <ArrowRight className="ml-2" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;