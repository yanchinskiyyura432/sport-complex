import { SelectedPage } from '@/shared/types';
import ActionButton from '@/shared/ActionButton';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Props = {
	setSelectedPage: (value: SelectedPage) => void;
}

const Home = (props: Props) => {

	return (
		<section id='home' className='gap-16 flex flex-grow py-10 md:h-full md:pb-0'>
			<motion.div className='md:flex  mx-auto w-5/6 items-center justify-center md:h-5/6' onViewportEnter={() => props.setSelectedPage(SelectedPage.Home)}>
				<div className='z-10 h-full  pt-[20%] md:basis-3/5'>
					<motion.div
						className='md:-mt-20'
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5 }}
						variants={{
							hidden: { opacity: 0, x: -50 },
							visible: { opacity: 1, x: 0 }
						}}>

						<h2 className="text-black text-8xl xs:text-md">Sport Complex</h2> 
					
						<p className='mt-8 text-black'>
							Unrivaled Gym. Unparalleled Training Fitness Classes. World Class Studios to get the Body Shapes That you Dream of.. Get Your Dream Body Now
						</p>
					</motion.div>

					<motion.div
						className='mt-8 flex items-center gap-8'
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						variants={{
							hidden: { opacity: 0, x: -50 },
							visible: { opacity: 1, x: 0 }
						}}>

						<ActionButton >
							Join Now
						</ActionButton>

						<Link
							className='text-sm font-bold text-blue-800 underline hover:text-blue-500'
							onClick={() => props.setSelectedPage(SelectedPage.ContactUs)}
							to='/benefits'>
							<p>Learn More</p>
						</Link>
					</motion.div>
				</div>
			</motion.div>
		</section>
	)
}

export default Home;
