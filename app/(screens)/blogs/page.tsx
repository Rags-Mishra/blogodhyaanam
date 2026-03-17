const BlogsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/IMG20260315181133.jpg')`
        }}
      >
        <div className="text-center text-white z-10">
          <h1 className="text-4xl md:text-7xl mb-3 md:font-semibold">Problems and Perspective</h1>
          <p className="text-xl opacity-90">by Ragini Mishra</p>
          <p className="text-lg text-gray-300">14 March 2026</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* Section 1 - Image Left */}
        <div className="mb-24 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="bg-white p-4 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              <img
                src="/assets/IMG_20260315_181428.jpg"
                alt="Coffee and notebook"
                className="w-full h-56 object-cover"
              />
              <p className="text-center mt-3 text-gray-600 italic">Picture doesn't contribute to the content</p>
            </div>
          </div>
          <div className="md:w-2/3">

            <p className="text-lg text-gray-700 leading-relaxed mb-4 blog-para">
              Hi, this is my first ever blog, I don't know if there'll be any more, but this itself has never existed before so.....never say never. Let's start what I want to say.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed blog-para">
              Recently, and I mean very recently like 1 week ago, I started a new role in my company. When I say "company", please believe it is some make-shift company that won't probably contribute to the world much. With this I don't mean to belittle the efforts of my CEO but the truth is that the efforts required to run a company are lacking here. So, that's why I believe that this company isn't for the long run or even if it did succeed somehow, it won't be a permanent company for me. But I have nothing else going on so it is all I have.
            </p>
          </div>
        </div>

        {/* Section 2 - Image Right */}
        <div className="mb-24 flex flex-col md:flex-row-reverse items-center gap-12">
          
          <div className="">
            <p className="text-lg text-gray-700 leading-relaxed mb-4 blog-para">
              So around 1 week ago I started this new role with a US client who wanted a 3+ year experienced person for a React developer role, my company was the recruiting team for them. They suggested I go for it, but the problem was, I DON'T HAVE 3+ YEARS OF EXPERIENCE!!!! But they needed someone urgently so I was suggested to lie on my resume so that they would select me. I was actually happy because it meant that not only would I get an opportunity to work with a US company, but a pay raise too. The only problem was that it was a night shift and I am not a night owl. I know it is stupid of me to not struggle a little with my sleep if it would mean I would get a good paying job, but I am not someone who compromises on her sleep schedule. I know, I am a noob for the corporate grind, later you'll confirm this yourself. I denied the role.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed blog-para">
              So fast forwarding my rant, I accepted the role because they had no one else to do the job at the time thinking that I would manage it somehow, but what I didn't know was that I signed up for something I have kind of never faced in my life. Humiliation. Yes, I have been pressured, forced to do work I really don't want to, held up for higher expectations and many more, but never have I ever been laughed or mocked for my work. This job has added a new teaching in the list. I believe in tough love, be it in personal life or professional. I learn things much better if I am pushed and challenged, but that comes with its boundaries. One can set deadlines for me, but I could not accept them to laugh at me if I don't get things at one go. So that's exactly what happened here. I was humiliated for asking one doubt.
               It may sound stupid to the seasoned corporate people, that ,'Oh! So what someone said something bad to you, chin up and move on. It is how corporate works'. Do I not know all this? Absolutely, I do! But does it make things sting any less? Not at all, atleast to me. I work on something because I want to not because I have to and if I am not getting the due credit for my work, let alone getting mocked for it, it just blows my mind. I instantly lose passion and any motivation to give my 100% to the work. I have been a people pleaser, kind of am still now. But I am actively trying to set boundaries to reduce the effect of people's opinions. But my godd!! This made me cry. For the first time in my life, I got a taste of corporate culture and it was BAAAD. I hid my sadness from my parents, but I couldn't fathom to connect with that hell of a person the next day.
               They are not letting me ask doubts, if I don't ask doubts, I am being told why am I working without guidance from upper management. These people weren't in sync themselves and that too with 17+ years of experience and expected me to know their inner thougts and follow exaclty the way each of them wanted. How does one do that? You yourself are conflicted with each other and make my life difficult because you get kick out of letting yourself out on someone younger and clearly scared with a lot of information dumped at the same time. I called up my CEO, asked him to switch me back to my old project and I just can't work here. He then assured me to talk to them and bring my issues to their attention, but I knew that this would only make them even more agitated. He asked me to work here for one month and then they would replace me with another hire. I reluctantly agreed, not because I was convinced but because I couldn't say no. What was my other option? to leave the company? That wasn't an option, I couldn't leave this job because then I would have nothing with me. I could let go of the money I was getting from this job. So, I persevered and returned to the job. 
            </p>
          </div>
        </div>

        {/* Section 3 - Image Left */}
        <div className="mb-16 flex flex-col md:flex-row items-center gap-12">
          
          <div className="">
            <p className="text-lg text-gray-700 leading-relaxed mb-4 blog-para">
             So, that has been the story of my life for the last 3-4 weeks. Now, coming to the title of this blog, 'Problems and Perspective', I just got to know about the problems faced by my friend at his place of work. His incidents made me realise that I did make a big deal of my situation. His employer weren't giving him his salary, even offer letter of LOR for his internship role.
             He wants to switch but with no experience letter, he would have to apply as a fresher which is a tough route to take. He mentioned other bad things with his company and HR which I can't remember but I do remember feeling sorry for him. I was comparing my situation with his and it made me realise that how much big deal was I creating out of a small problem. But it happens, right? In retrospect, the problems seem smaller and you find yourself at a position where you can imagine different scenarios of how you could have gotten out of those problems. When we hear about someone else's problems, ours start to seem manageable compared to theirs. At least this is the case for me.
             It is even possible that he too thinks after hearing my problem that his problems are nothing compared to mine, or not. There are so many troubled individuals in world, in worse conditions than mine, having toxic bosses, not being able to leave even if they wanted to, situations that could make me change my stream and opt sprituality. When I think about all this, I feel both small and grateful. Small because of how I am so weak that I cry over smallest of the inconveniences. Life has not yet started throwing real problems at me, and I am so bothered by the situations in hand that I feel so unprepared for something much bigger that this. But on the bright side, I feel grateful to God and life that I got a different perspective to calm me down. I have things so many people aspire to have, supportive parents, bearable siblings, healthy body, sound mind, and everything else I am blessed with. Stories like this, makes me realise the abundance of freedom and resources I have that I could utilise to make something out of myself. When people say,'It's all about perspective', they aren't wrong. To even have the priviledge of having perspective, is a big deal. So, that's it from my side. I am glad that I ended this on a happy note unlike my diary where I cried my heart out. It feels nice to look back at the awful stuff that happens and come out of it with a new lesson, one that will help you fight another one that awaits us or we just forget what we learnt and go down the rabbit hole yet again. After all, it is all about perspective :)
            </p>
            
          </div>
        </div>

      </div>
    </div>
  )
};
export default BlogsPage;