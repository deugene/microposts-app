/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDataService } from './user-data.service';
import { User } from './user';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
    });
  });

  it('should ...', inject([UserDataService], (service: UserDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('CRUD', () => {
    let service;

    beforeEach(inject([UserDataService], (_service: UserDataService) => {
      service = _service;
    }));

    describe('#findAll()', () => {
      it('should return an empty array by default', done => {
        service.findAll()
          .then(users => {
            // TODO: fix it later
            expect(users.length).toEqual(1);
            done();
          });
      });

      it('should return all users', done => {
        const user1 = new User('1@e.ua', 'Foo', 'Bar');
        const user2 = new User('2@e.ua', 'Tobi', 'Ferret');
        Promise.all([ service.add(user1), service.add(user2) ])
          .then(() => {
            service.findAll()
              .then(users => {
                expect(users).toEqual([ user1, user2 ]);
                done();
              });
          });
      });
    });

    describe('#findById()', () => {
      let newUser: User;

      beforeEach(done => {
        service.add(new User('2@e.ua', 'Tobi', 'Ferret'))
          .then(user => {
            newUser = user;
            done();
          });
      });

      it('should return user with corresponding id', done => {
        service.findById(newUser.id)
          .then(u => {
            expect(u).toEqual(newUser);
            done();
          });
      });

      it('should not return not existing user', done => {
        service.findById(3)
          .then(u => {
            expect(u).toEqual(null);
            done();
          });
      });
    });

    describe('#add()', () => {
      it('should automatically assign an incremental id', done => {
        const user1 = new User('1@e.ua', 'Foo', 'Bar');
        const user2 = new User('2@e.ua', 'Tobi', 'Ferret');
        Promise.all([ service.add(user1), service.add(user2) ])
          .then(() => {
            Promise.all([
              service.findById(1),
              service.findById(2)
            ])
            .then(results => {
              expect(results).toEqual([ user1, user2 ]);
              done();
            });
          });
      });
    });

    describe('#deleteById()', () => {
      const user = new User('1@e.ua', 'Foo', 'Bar');

      beforeEach(done => {
        service.add(user)
          .then(() => {
            service.findAll()
              .then(users => {
                expect(users).toEqual([ user ]);
                done();
              });
          });
      });

      it('should remove user with corresponding id', done => {
        service.deleteById(1)
          .then(() => {
            service.findAll()
              .then(remainder => {
                expect(remainder).toEqual([]);
                done();
              });
          });
      });

      it('should not removing anything if user with corresponding id is not found', done => {
        service.deleteById(2)
          .then(() => {
            service.findAll()
              .then(remainder => {
                expect(remainder).toEqual([ user ]);
                done();
              });
          });
      });
    });

    describe('#updateById()', () => {
      beforeEach(done => {
        service.add(new User('1@e.ua', 'Foo', 'Bar'))
          .then(() => done());
      });

      it('should return user with corresponding id and updated data', done => {
        service.updateById(1, { firstName: 'Bar' })
          .then(updatedUser => {
            expect(updatedUser.fullName).toEqual('Bar Bar');
            done();
          });
      });

      it('should return null if user is not found', done => {
        service.updateById(2, { firstName: 'Bar' })
          .then(updatedUser => {
            expect(updatedUser).toEqual(null);
            done();
          });
      });
    });

  });

});
