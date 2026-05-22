import React from 'react'
import Hero from './Hero'
import CitiesRow from './CitiesRow'
import FeaturedProperties from './FeaturedProperties'
import Steps from './Steps'
import Article from './Articles'
import Turning from './Turning' 
// import WhyWork from './WhyWork'
import Categories from './Categories'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CitiesRow/>
      <FeaturedProperties/>
      <Steps/>
      {/* <WhyWork/> */}
       <Turning/>
      <Categories/>
      <Article/>
      
    </div>
  )
}

export default Home;
