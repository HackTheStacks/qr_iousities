from math import floor
import string

class Shortener():
    def toBase62(self, num, b=62):
        if b <= 0 or b > 62:
            return 0
        base = string.digits + string.lowercase + string.uppercase
        r = num % b
        res = base[r]
        q = floor(num / b)
        while q:
            r = q % b
            q = floor(q / b)
            res = base[int(r)] + res
        return res

    def toBase10(self, num, b=62):
        base = string.digits + string.lowercase + string.uppercase
        limit = len(num)
        res = 0
        for i in xrange(limit):
            res = b * res + base.find(num[i])
        return res

    def id_to_short(self, id):
        return self.toBase62(id)

    def short_to_id(self, short):
        return self.toBase10(short)

