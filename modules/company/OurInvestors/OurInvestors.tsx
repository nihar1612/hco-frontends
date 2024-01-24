import Image from 'next/image';
import kindredVentures from 'public/images/investors/kindred_ventures.png';


const Investor = ({ name, subheading }: { name: string, subheading: string }) =>
    <div className="md:text-xl flex flex-col font-semibold">
        {name}
        <div className='font-inter font-normal text-dawnDark-400'>{subheading}</div>
    </div>

export function OurInvestors() {
    return (
        <section className="overflow-hidden py-22 md:py-30 mx-auto text-center w-6/12">
            <h2 className='text-dawnPurple-500 mb-10 font-medium leading-4 tracking-widest text-white uppercase'>BACKED BY</h2>
            <div><Image src={kindredVentures} alt="Kindred Ventures" height='88px' width='225px' /></div>
            <div className='grid grid-rows-1 grid-cols-1 md:grid-rows-2 md:grid-cols-2 gap-12 my-12'>
                <Investor name='Kevin Lin' subheading='Co-Founder of Twitch' />
                <Investor name='Eoghan McCabe' subheading='Co-Founder of Intercom' />
                <Investor name='Tom McInerney' subheading='Founder of TGM Ventures' />
                <Investor name='Ilya Volodarsky' subheading='Co-Founder of Segment' />
            </div>
            <div className='font-semibold md:text-xl'>and more!</div>
        </section>
    );
}
