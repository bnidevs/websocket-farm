import pickle
import random
import indices
import threading
import time
import websockets

class FarmArea:
  def __init__(self):
    self.area = []
    self.spawn = ()
    self.tknum = 0

    self.initarea()
    print(self.area)

  def blank(self):
    for i in range(1000):
      self.area.append([])
      for j in range(1000):
        self.area[-1].append(0)

  def choose_start(self):
    i = random.randint(50,950)
    j = random.randint(50,950)
    self.area[i][j] = indices.Farm.normal
    self.spawn = (i+1,j)

  def populate_plants(self):
    for i in range(1000):
      for j in range(1000):
        if self.area[i][j] != 4:
          k = random.random()
          if k < 0.6:
            self.area[i][j] = indices.Dirt.undiscovered
          elif k < 0.65:
            self.area[i][j] = indices.Stone.undiscovered
          elif k < 0.8:
            self.area[i][j] = indices.Grass.undiscovered
          elif k < 0.9:
            self.area[i][j] = indices.Water.undiscovered
          else:
            self.area[i][j] = indices.Tree.undiscovered

  def save(self):
    f = open("savefile","r")
    pickle.dump(self, f)

  def tick(self):
    self.tknum += 1
    self.tknum %= 60
    time.sleep(1)

  def start_tick(self):
    self.tkthread = threading.Thread(target=self.tick)
    self.tkthread.start()

  def initarea(self):
    self.blank()
    self.choose_start()
    self.populate_plants()

class FarmPlayers:
  def __init__(self):
    self.player_coords = {}
    self.player_users = {}

x = FarmArea()
