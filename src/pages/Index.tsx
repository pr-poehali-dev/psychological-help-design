import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type CharacterType = '😊' | '🌟' | '🦄' | '🌸';
type MoodType = '😢' | '😐' | '😊' | '😄' | '🤩';

interface MoodEntry {
  date: string;
  mood: MoodType;
  note: string;
}

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<'splash' | 'register' | 'app'>('splash');
  const [username, setUsername] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType>('😊');
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const { toast } = useToast();

  const characters: CharacterType[] = ['😊', '🌟', '🦄', '🌸'];
  const moods: MoodType[] = ['😢', '😐', '😊', '😄', '🤩'];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setScreen('register');
    }, 2500);
  }, []);

  const handleRegister = () => {
    if (username.trim()) {
      setScreen('app');
      toast({
        title: `Привет, ${username}! ${selectedCharacter}`,
        description: 'Рада познакомиться! Я буду рядом в твоём путешествии.',
      });
    }
  };

  const saveMood = () => {
    if (currentMood) {
      const entry: MoodEntry = {
        date: new Date().toLocaleDateString('ru-RU'),
        mood: currentMood,
        note: moodNote,
      };
      setMoodEntries([entry, ...moodEntries]);
      setCurrentMood(null);
      setMoodNote('');
      toast({
        title: 'Настроение сохранено!',
        description: 'Спасибо, что делишься своими эмоциями 🌸',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center relative overflow-hidden">
        <div className="blob-bg w-64 h-64 bg-white/20 top-10 right-10"></div>
        <div className="blob-bg w-48 h-48 bg-white/15 bottom-20 left-10"></div>
        <div className="text-center animate-scale-in relative z-10">
          <div className="text-9xl mb-6 animate-float">🌸</div>
          <h1 className="text-5xl font-bold text-white mb-2">MindPal</h1>
          <p className="text-white/80 text-lg">Твой путь к гармонии</p>
          <div className="flex gap-2 justify-center mt-8">
            <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
            <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-pulse-glow" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2.5 h-2.5 bg-white/70 rounded-full animate-pulse-glow" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'register') {
    return (
      <div className="min-h-screen gradient-accent flex items-center justify-center p-4 relative overflow-hidden">
        <div className="blob-bg w-80 h-80 bg-primary/10 top-0 right-0"></div>
        <div className="blob-bg w-64 h-64 bg-secondary/10 bottom-0 left-0"></div>
        
        <Card className="w-full max-w-md p-8 animate-fade-in shadow-2xl relative z-10 border-0">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-float">🌸</div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">
              Добро пожаловать!
            </h2>
            <p className="text-muted-foreground text-lg">Давай знакомиться</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-lg font-medium">Как тебя зовут?</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введи своё имя"
                className="mt-2 h-14 text-lg border-2 focus:border-primary"
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              />
            </div>

            <div>
              <Label className="text-lg font-medium mb-4 block">Выбери персонажа-помощника</Label>
              <div className="grid grid-cols-4 gap-3">
                {characters.map((char) => (
                  <button
                    key={char}
                    onClick={() => setSelectedCharacter(char)}
                    className={`text-6xl p-4 rounded-3xl transition-all hover:scale-110 ${
                      selectedCharacter === char
                        ? 'gradient-primary shadow-xl scale-110'
                        : 'bg-muted hover:bg-secondary/30'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleRegister}
              disabled={!username.trim()}
              className="w-full h-14 text-lg gradient-primary border-0 text-white shadow-lg hover:shadow-xl hover:opacity-95 transition-all"
            >
              Начать путешествие 🌟
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Tabs defaultValue="home" className="w-full">
        <div className="container max-w-4xl mx-auto p-4">
          <div className="mb-6 animate-fade-in">
            <Card className="illustration-card gradient-card border-0 shadow-lg overflow-hidden">
              <div className="blob-bg w-40 h-40 bg-primary/20 -top-10 -right-10"></div>
              <div className="blob-bg w-32 h-32 bg-secondary/15 -bottom-5 -left-5"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="text-6xl animate-float">{selectedCharacter}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">Привет, {username}!</h3>
                    <p className="text-muted-foreground">Как твоё настроение сегодня?</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <TabsContent value="home" className="space-y-5">
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <Card className="illustration-card p-6 hover-scale cursor-pointer gradient-card border-0 shadow-md">
                <div className="blob-bg w-24 h-24 bg-primary/15 -top-5 -right-5"></div>
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-3">📝</div>
                  <h4 className="font-semibold text-lg mb-1">Дневник</h4>
                  <p className="text-sm text-muted-foreground">Отслеживай эмоции</p>
                </div>
              </Card>

              <Card className="illustration-card p-6 hover-scale cursor-pointer gradient-card border-0 shadow-md">
                <div className="blob-bg w-24 h-24 bg-accent/20 -top-5 -right-5"></div>
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-3">🧘‍♀️</div>
                  <h4 className="font-semibold text-lg mb-1">Медитация</h4>
                  <p className="text-sm text-muted-foreground">Найди покой</p>
                </div>
              </Card>

              <Card className="illustration-card p-6 hover-scale cursor-pointer gradient-card border-0 shadow-md">
                <div className="blob-bg w-24 h-24 bg-secondary/20 -top-5 -right-5"></div>
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-3">💭</div>
                  <h4 className="font-semibold text-lg mb-1">Поговорить</h4>
                  <p className="text-sm text-muted-foreground">Я тебя слушаю</p>
                </div>
              </Card>

              <Card className="illustration-card p-6 hover-scale cursor-pointer gradient-card border-0 shadow-md">
                <div className="blob-bg w-24 h-24 bg-primary/10 -top-5 -right-5"></div>
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-3">📊</div>
                  <h4 className="font-semibold text-lg mb-1">Прогресс</h4>
                  <p className="text-sm text-muted-foreground">Твой рост</p>
                </div>
              </Card>
            </div>

            <Card className="p-6 shadow-md border-0 bg-white">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span>💡</span> Совет дня от {selectedCharacter}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Помни, что каждый день — это новая возможность. Даже маленький шаг вперёд — это прогресс. 
                Будь добра к себе! 🌸
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="space-y-5">
            <Card className="p-6 animate-fade-in shadow-md border-0 bg-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>📝</span> Дневник настроения
              </h3>

              <div className="space-y-5">
                <div>
                  <Label className="text-lg font-medium mb-4 block">Как ты себя чувствуешь?</Label>
                  <div className="flex gap-2 justify-between">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setCurrentMood(mood)}
                        className={`text-5xl p-3 rounded-3xl transition-all hover:scale-110 ${
                          currentMood === mood
                            ? 'gradient-primary shadow-xl scale-110'
                            : 'bg-muted hover:bg-secondary/20'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {currentMood && (
                  <div className="space-y-3 animate-fade-in">
                    <Label htmlFor="note" className="font-medium">Хочешь что-то записать?</Label>
                    <Input
                      id="note"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      placeholder="Что происходит у тебя на душе?"
                      className="h-12 border-2"
                    />
                    <Button 
                      onClick={saveMood} 
                      className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl"
                    >
                      Сохранить настроение 🌸
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {moodEntries.length > 0 && (
              <Card className="p-6 animate-fade-in shadow-md border-0 bg-white">
                <h4 className="font-semibold text-lg mb-4">История настроений</h4>
                <div className="space-y-3">
                  {moodEntries.map((entry, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 gradient-card rounded-3xl">
                      <div className="text-4xl">{entry.mood}</div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground font-medium mb-1">{entry.date}</div>
                        {entry.note && <p className="text-sm">{entry.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-5">
            <Card className="p-6 animate-fade-in shadow-md border-0 bg-white">
              <div className="flex items-center gap-6 mb-8">
                <Avatar className="w-24 h-24 text-6xl border-4 border-primary/20">
                  <AvatarFallback className="gradient-primary text-6xl">
                    {selectedCharacter}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{username}</h3>
                  <p className="text-muted-foreground">Вместе с {selectedCharacter} в гармонии</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold">Прогресс этой недели</span>
                    <span className="text-muted-foreground font-medium">5 из 7 дней</span>
                  </div>
                  <Progress value={71} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-5 gradient-card rounded-3xl">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {moodEntries.length}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Записей</div>
                  </div>
                  <div className="text-center p-5 gradient-card rounded-3xl">
                    <div className="text-4xl font-bold text-primary mb-1">
                      12
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">Дней с нами</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-12 border-2 hover:bg-secondary/20 hover:border-primary">
                    <Icon name="Settings" className="mr-3" size={20} />
                    <span className="font-medium">Настройки</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 border-2 hover:bg-secondary/20 hover:border-primary">
                    <Icon name="Bell" className="mr-3" size={20} />
                    <span className="font-medium">Уведомления</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 border-2 hover:bg-secondary/20 hover:border-primary">
                    <Icon name="HelpCircle" className="mr-3" size={20} />
                    <span className="font-medium">Помощь</span>
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>

        <TabsList className="fixed bottom-0 left-0 right-0 w-full h-16 rounded-none border-t-2 bg-white/95 backdrop-blur-sm shadow-lg">
          <TabsTrigger 
            value="home" 
            className="flex-1 h-full data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
          >
            <div className="flex flex-col items-center gap-1">
              <Icon name="Home" size={22} />
              <span className="text-xs font-medium">Главная</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="diary" 
            className="flex-1 h-full data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
          >
            <div className="flex flex-col items-center gap-1">
              <Icon name="BookOpen" size={22} />
              <span className="text-xs font-medium">Дневник</span>
            </div>
          </TabsTrigger>
          <TabsTrigger 
            value="profile" 
            className="flex-1 h-full data-[state=active]:bg-primary data-[state=active]:text-white rounded-none"
          >
            <div className="flex flex-col items-center gap-1">
              <Icon name="User" size={22} />
              <span className="text-xs font-medium">Профиль</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Index;
