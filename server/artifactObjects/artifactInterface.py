import abc

class baseArtifact(object):

    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def validateUrl(self, url):
        """Validate user input as valid URL for the specific type of artifact/data source."""
        return 

    @abc.abstractmethod
    def parseID(self, url):
        """Parse out Item ID from URL"""
        return

    @abc.abstractmethod
    def getArtifactData(self, itemID):
        """Based on Item ID, fetch artifact info from either our database or a museum API"""
        return