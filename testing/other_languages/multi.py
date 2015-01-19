class First(object):
    def __init__(self):
    	self.local = "local1"

class Second(First):
    def __init__(self):
    	self.local = "local2"

class Third(First):
    def __init__(self):
    	self.local = "local3"

class Fourth(Third, Second):
    def __init__(self, strn):
    	super(Fourth, self).__init__()


a = Fourth("hola")
print a.local