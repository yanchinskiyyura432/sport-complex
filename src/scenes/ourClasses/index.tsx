import { ClassType, SelectedPage } from "@/shared/types";
import image1 from '@/assets/image1.png';
import image2 from '@/assets/image2.png';
import image3 from '@/assets/image3.png';
import image4 from '@/assets/image4.png';
import image5 from '@/assets/image5.png';
import image6 from '@/assets/image6.png';
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import Class from "./Class";

const classes: Array<ClassType> = [
	{
		name: "Weight Training Classes",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		image: image1,
	},
	{
		name: "Yoga Classes",
		image: image2,
	},
	{
		name: "Ab Core Classes",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		image: image3,
	},
	{
		name: "Adventure Classes",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		image: image4,
	},

];

type Props = {
	setSelectedPage: (value: SelectedPage) => void;
}

const OurClasses = (props: Props) => {
	return (
		<section id="our-classes" className="w-full bg-neutral-100 text-black py-40">
			<motion.div className="mx-auto w-5/6" onViewportEnter={() => props.setSelectedPage(SelectedPage.OurClasses)}>
				<motion.div
					className="mx-auto w-5/6"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.5 }}
					variants={{
						hidden: { opacity: 0, x: -50 },
						visible: { opacity: 1, x: 0 }
					}}>
					<div className="md:w-3/5">
						<HText> Our Classes</HText>
						<p className="py-5">
							Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
							tellus quam porttitor. Mauris velit euismod elementum arcu neque
							facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
							enim mattis odio in risus nunc.
						</p>
					</div>
				</motion.div>
				<div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
					<ul className="w-[1900px] whitespace-nowrap">
						{classes.map((item: ClassType, index) => (
							<Class
								key={`${item.name}-${index}`}
								name={item.name}
								image={item.image}
								description={item.description}
							/>
						))}
					</ul>
				</div>
			</motion.div>
		</section>
	)
}

export default OurClasses