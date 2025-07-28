import QuranPlayer from '@/components/QuranPlayer';
import quranBg from '@/assets/quran-bg.jpg';

const Index = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: `linear-gradient(rgba(210, 220, 248, 0.9), rgba(158, 220, 248, 0.9)), url(${quranBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            مشغل القرآن الكريم
          </h1>
          <p className="text-xl text-muted-foreground">
            Listen to the Holy Quran with beautiful recitations
          </p>
        </div>
        
        <QuranPlayer />
      </div>
    </div>
  );
};

export default Index;
