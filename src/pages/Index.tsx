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

type CharacterType = '😊' | '🌟' | '🦄' | '🌈';
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

  const characters: CharacterType[] = ['😊', '🌟', '🦄', '🌈'];
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
        description: 'Рад познакомиться! Я буду рядом в твоём путешествии.',
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
        description: 'Спасибо, что делишься своими эмоциями',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-primary flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <div className="text-9xl mb-8 animate-float">😊</div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">MindPal</h1>
          <div className="flex gap-2 justify-center">
            <div className="w-3 h-3 bg-primary-foreground/60 rounded-full animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
            <div className="w-3 h-3 bg-primary-foreground/60 rounded-full animate-pulse-glow" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-primary-foreground/60 rounded-full animate-pulse-glow" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'register') {
    return (
      <div className="min-h-screen gradient-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 animate-fade-in shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-primary">
              Добро пожаловать!
            </h2>
            <p className="text-muted-foreground">Давай знакомиться</p>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-lg">Как тебя зовут?</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введи своё имя"
                className="mt-2 h-12 text-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
              />
            </div>

            <div>
              <Label className="text-lg mb-4 block">Выбери персонажа-помощника</Label>
              <div className="grid grid-cols-4 gap-4">
                {characters.map((char) => (
                  <button
                    key={char}
                    onClick={() => setSelectedCharacter(char)}
                    className={`text-6xl p-4 rounded-2xl transition-all hover:scale-110 ${
                      selectedCharacter === char
                        ? 'gradient-primary shadow-lg scale-105'
                        : 'bg-muted hover:bg-accent'
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
              className="w-full h-12 text-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Начать путешествие
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="home" className="w-full">
        <div className="container max-w-4xl mx-auto p-4 pb-20">
          <div className="mb-6 animate-fade-in">
            <Card className="p-6 gradient-card border-none shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedCharacter}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Привет, {username}!</h3>
                  <p className="text-muted-foreground">Как твоё настроение сегодня?</p>
                </div>
              </div>
            </Card>
          </div>

          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer gradient-card border-0">
                <div className="text-center">
                  <div className="text-4xl mb-3">📝</div>
                  <h4 className="font-semibold text-lg">Дневник настроения</h4>
                  <p className="text-sm text-muted-foreground mt-1">Отслеживай эмоции</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer gradient-card border-0">
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h4 className="font-semibold text-lg">Упражнения</h4>
                  <p className="text-sm text-muted-foreground mt-1">Практики для души</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer gradient-card border-0">
                <div className="text-center">
                  <div className="text-4xl mb-3">💭</div>
                  <h4 className="font-semibold text-lg">Поговорить</h4>
                  <p className="text-sm text-muted-foreground mt-1">Я тебя слушаю</p>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer gradient-card border-0">
                <div className="text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h4 className="font-semibold text-lg">Прогресс</h4>
                  <p className="text-sm text-muted-foreground mt-1">Твои достижения</p>
                </div>
              </Card>
            </div>

            <Card className="p-6 shadow-sm">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span>💡</span> Совет дня от {selectedCharacter}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Помни, что каждый день — это новая возможность. Даже маленький шаг вперёд — это прогресс. 
                Будь добр к себе! 💜
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6">
            <Card className="p-6 animate-fade-in shadow-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>📝</span> Дневник настроения
              </h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-lg mb-3 block">Как ты себя чувствуешь?</Label>
                  <div className="flex gap-3 justify-between">
                    {moods.map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setCurrentMood(mood)}
                        className={`text-5xl p-4 rounded-2xl transition-all hover:scale-110 ${
                          currentMood === mood
                            ? 'gradient-primary shadow-lg scale-105'
                            : 'bg-muted hover:bg-accent'
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>

                {currentMood && (
                  <div className="space-y-3 animate-fade-in">
                    <Label htmlFor="note">Хочешь что-то записать?</Label>
                    <Input
                      id="note"
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      placeholder="Что происходит у тебя на душе?"
                      className="h-12"
                    />
                    <Button onClick={saveMood} className="w-full bg-primary text-primary-foreground hover:opacity-90">
                      Сохранить настроение
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {moodEntries.length > 0 && (
              <Card className="p-6 animate-fade-in shadow-sm">
                <h4 className="font-semibold text-lg mb-4">История настроений</h4>
                <div className="space-y-3">
                  {moodEntries.map((entry, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 gradient-card rounded-2xl">
                      <div className="text-3xl">{entry.mood}</div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground">{entry.date}</div>
                        {entry.note && <p className="mt-1">{entry.note}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6 animate-fade-in shadow-sm">
              <div className="flex items-center gap-6 mb-8">
                <Avatar className="w-24 h-24 text-5xl">
                  <AvatarFallback className="gradient-primary text-5xl">
                    {selectedCharacter}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{username}</h3>
                  <p className="text-muted-foreground">Вместе с {selectedCharacter}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Прогресс этой недели</span>
                    <span className="text-muted-foreground">5 из 7 дней</span>
                  </div>
                  <Progress value={71} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 gradient-card rounded-2xl">
                    <div className="text-3xl font-bold text-primary">
                      {moodEntries.length}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Записей</div>
                  </div>
                  <div className="text-center p-4 gradient-card rounded-2xl">
                    <div className="text-3xl font-bold text-primary">
                      12
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Дней с нами</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-accent">
                    <Icon name="Settings" className="mr-2" />
                    Настройки
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-accent">
                    <Icon name="Bell" className="mr-2" />
                    Уведомления
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-12 hover:bg-accent">
                    <Icon name="HelpCircle" className="mr-2" />
                    Помощь
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </div>

        <TabsList className="fixed bottom-0 left-0 right-0 w-full h-16 rounded-none border-t bg-card/95 backdrop-blur-sm">
          <TabsTrigger value="home" className="flex-1 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <div className="flex flex-col items-center gap-1">
              <Icon name="Home" size={20} />
              <span className="text-xs">Главная</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="diary" className="flex-1 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <div className="flex flex-col items-center gap-1">
              <Icon name="BookOpen" size={20} />
              <span className="text-xs">Дневник</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex-1 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <div className="flex flex-col items-center gap-1">
              <Icon name="User" size={20} />
              <span className="text-xs">Профиль</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Index;
